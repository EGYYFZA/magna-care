import { useEffect, useRef } from 'react';
import { Group, MathUtils, PerspectiveCamera, Scene } from 'three';
import { CSS3DObject, CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { products, formatPrice } from '../data/product';

const panels = [...products, ...products];
const step = (Math.PI * 2) / panels.length;
const wrap = (index, count) => ((index % count) + count) % count;

export default function ProductRing({ controllerRef, onSelect, onOpen, hidden }) {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const scene = new Scene();
    const group = new Group();
    scene.add(group);
    const camera = new PerspectiveCamera();
    const renderer = new CSS3DRenderer();
    renderer.domElement.className = 'ring-renderer';
    stage.appendChild(renderer.domElement);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let radius = 650;
    let angle = 0;
    let target = 0;
    let tilt = 0;
    let tiltTarget = 0;
    let frame = 0;
    let lastTime = 0;
    let snapTimer;
    let drag = null;
    let dragged = false;
    let selected = 0;

    const objects = panels.map((product, index) => {
      const duplicate = index >= products.length;
      const card = document.createElement(duplicate ? 'div' : 'button');
      if (!duplicate) card.type = 'button';
      card.className = 'orbit-card';
      card.dataset.productId = product.id;
      card.dataset.panel = index;
      card.setAttribute('aria-label', `${product.name}, ${formatPrice(product.price)}`);
      // Repeated panels close the visual ring without inventing more products.
      if (duplicate) card.setAttribute('aria-hidden', 'true');
      const image = document.createElement('img');
      image.src = product.image;
      image.alt = product.name;
      image.draggable = false;
      image.width = 400;
      image.height = 500;
      image.addEventListener(
        'error',
        () => {
          image.remove();
          card.classList.add('orbit-card--unavailable');
          card.textContent = product.name;
        },
        { once: true },
      );
      card.appendChild(image);
      card.addEventListener('focus', () => {
        if (!drag) select(index);
      });
      card.addEventListener('click', (event) => {
        if (event.detail > 0 && dragged) return;
        if (event.detail === 0 || wrap(Math.round(angle / step), panels.length) === index) {
          onOpen(product);
        } else select(index);
      });
      const object = new CSS3DObject(card);
      group.add(object);
      return object;
    });

    function render(time = performance.now()) {
      frame = 0;
      if (!stage.clientWidth || document.hidden) return;
      const dt = Math.min((time - (lastTime || time - 16)) / 1000, 0.05);
      lastTime = time;
      angle = media.matches ? target : MathUtils.damp(angle, target, 9, dt);
      tilt = media.matches ? 0 : MathUtils.damp(tilt, tiltTarget, 7, dt);
      if (Math.abs(angle - target) < 0.0001) angle = target;
      if (Math.abs(tilt - tiltTarget) < 0.0001) tilt = tiltTarget;
      group.rotation.x = tilt;
      objects.forEach((object, index) => {
        const theta = index * step - angle;
        object.position.set(Math.sin(theta) * radius, 0, Math.cos(theta) * radius - radius);
        object.rotation.y = theta;
        object.scale.x = Math.cos(theta) < 0 ? -1 : 1;
        object.element.dataset.active = String(
          wrap(Math.round(angle / step), panels.length) === index,
        );
      });
      renderer.render(scene, camera);
      const next = wrap(Math.round(angle / step), products.length);
      if (next !== selected) {
        selected = next;
        onSelect(next);
      }
      const moving = angle !== target || tilt !== tiltTarget;
      stage.dataset.moving = String(moving);
      stage.dataset.angle = angle.toFixed(4);
      if (moving) frame = requestAnimationFrame(render);
    }
    function wake() {
      if (!frame && stage.clientWidth && !document.hidden) {
        stage.dataset.moving = 'true';
        lastTime = 0;
        frame = requestAnimationFrame(render);
      }
    }
    function select(index) {
      const requested = index * step;
      target = requested + Math.round((angle - requested) / (Math.PI * 2)) * Math.PI * 2;
      wake();
    }
    function snap() {
      target = Math.round(target / step) * step;
      tiltTarget = 0;
      wake();
    }
    function resize() {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (!width || !height) return;
      const mobile = width <= 640;
      const scale = Math.min(1, width / 1440);
      const size = Math.min(mobile ? width * 0.46 : 270 * scale, height * 0.48);
      radius = mobile ? width * 0.56 : 650 * scale;
      const focal = mobile ? 1000 : 1600;
      camera.fov = MathUtils.radToDeg(2 * Math.atan(height / (2 * focal)));
      camera.aspect = width / height;
      camera.position.z = focal;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      objects.forEach(({ element }) => {
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
      });
      wake();
    }
    function wheel(event) {
      if (event.ctrlKey) return;
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      target += MathUtils.clamp(delta * (event.deltaMode === 1 ? 16 : 1), -180, 180) * 0.005;
      clearTimeout(snapTimer);
      snapTimer = setTimeout(snap, 150);
      wake();
    }
    function pointerDown(event) {
      if (event.button !== 0 || !event.isPrimary) return;
      clearTimeout(snapTimer);
      dragged = false;
      drag = { x: event.clientX, y: event.clientY, angle, previousX: event.clientX, velocity: 0 };
    }
    function pointerMove(event) {
      if (!drag) return;
      if (Math.abs(event.clientX - drag.x) > 5) {
        dragged = true;
        if (!stage.hasPointerCapture(event.pointerId)) stage.setPointerCapture(event.pointerId);
        stage.classList.add('is-dragging');
      }
      if (!dragged) return;
      drag.velocity = (drag.previousX - event.clientX) * 0.005;
      drag.previousX = event.clientX;
      target = drag.angle - (event.clientX - drag.x) * 0.006;
      tiltTarget = MathUtils.clamp((event.clientY - drag.y) * 0.0015, -0.13, 0.13);
      wake();
    }
    function pointerUp(event) {
      if (!drag) return;
      if (dragged)
        target +=
          media.matches || event.type === 'pointercancel'
            ? 0
            : MathUtils.clamp(drag.velocity * 3, -0.8, 0.8);
      drag = null;
      stage.classList.remove('is-dragging');
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
      snap();
    }
    function keyboard(event) {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        !['ArrowLeft', 'ArrowRight'].includes(event.key)
      )
        return;
      event.preventDefault();
      target = (Math.round(target / step) + (event.key === 'ArrowRight' ? 1 : -1)) * step;
      wake();
    }
    function visibility() {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else wake();
    }

    controllerRef.current = {
      move(direction) {
        target = (Math.round(target / step) + direction) * step;
        wake();
      },
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    stage.addEventListener('wheel', wheel, { passive: false });
    stage.addEventListener('pointerdown', pointerDown);
    stage.addEventListener('pointermove', pointerMove);
    stage.addEventListener('pointerup', pointerUp);
    stage.addEventListener('pointercancel', pointerUp);
    stage.addEventListener('keydown', keyboard);
    media.addEventListener('change', wake);
    document.addEventListener('visibilitychange', visibility);
    resize();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(snapTimer);
      stage.removeEventListener('wheel', wheel);
      stage.removeEventListener('pointerdown', pointerDown);
      stage.removeEventListener('pointermove', pointerMove);
      stage.removeEventListener('pointerup', pointerUp);
      stage.removeEventListener('pointercancel', pointerUp);
      stage.removeEventListener('keydown', keyboard);
      media.removeEventListener('change', wake);
      document.removeEventListener('visibilitychange', visibility);
      group.clear();
      renderer.domElement.remove();
      controllerRef.current = null;
    };
  }, [controllerRef, onOpen, onSelect]);

  return (
    <div
      ref={stageRef}
      className="ring-stage"
      hidden={hidden}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Galeri produk 3D. Geser, scroll, atau gunakan panah kiri dan kanan."
    />
  );
}
