<template>
  <div class="relative w-full h-full">
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden" ref="background">
      <transition-group name="fade" tag="div">
        <div
          v-for="(step, index) in pawTrail"
          :key="`primary-${step.id}`"
          class="absolute bg-cover bg-no-repeat w-8 h-8 animate-fadeOut"
          :style="step.style"
        ></div>
      </transition-group>
      <transition-group name="fade" tag="div">
        <div
          v-for="(step, index) in secondaryTrail"
          :key="`secondary-${step.id}`"
          class="absolute bg-cover bg-no-repeat w-8 h-8 opacity-70 animate-fadeOut"
          :style="step.style"
        ></div>
      </transition-group>
    </div>

    <div class="relative z-10">
      <Navbar />
      <slot />
      <Footer />
    </div>
  </div>
</template>

<script>
import pawImage from '~/assets/images/paw.png';

export default {
  data() {
    return {
      pawTrail: [],
      secondaryTrail: [],
      position: { x: 100, y: 100 },
      secondaryOffset: { forward: 10, side: 20 },
      direction: { x: 1, y: 0 },
      stepSize: 30,
      angle: 0,
      fadeOutDuration: 2000,
      isPrimaryTurn: true,
      bounds: { top: 0, left: 0, width: 0, height: 0 },
    };
  },
  mounted() {
    this.updateBounds();
    this.startWalking();

    window.addEventListener('resize', this.updateBounds);
    window.addEventListener('scroll', this.updateBounds);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateBounds);
    window.removeEventListener('scroll', this.updateBounds);
  },
  methods: {
    updateBounds() {
      const bodyRect = document.body.getBoundingClientRect();
      this.bounds = {
        top: bodyRect.top,
        left: bodyRect.left,
        width: bodyRect.width,
        height: bodyRect.height,
      };
    },
    startWalking() {
      setInterval(() => {
        if (this.isPrimaryTurn) {
          this.leavePrimaryTrail();
        } else {
          this.leaveSecondaryTrail();
        }
        this.movePaw();
        this.maybeTurn();
        this.isPrimaryTurn = !this.isPrimaryTurn;
      }, 300);
    },
    leavePrimaryTrail() {
      const id = Date.now();

      this.pawTrail.push({
        id,
        style: {
          left: `${this.position.x}px`,
          top: `${this.position.y}px`,
          transform: `rotate(${this.angle}deg)`,
          backgroundImage: `url(${pawImage})`,
        },
      });

      setTimeout(() => {
        this.pawTrail = this.pawTrail.filter((step) => step.id !== id);
      }, this.fadeOutDuration);
    },
    leaveSecondaryTrail() {
      const id = Date.now();

      const offsetRadians = (this.angle * Math.PI) / 180;
      const forwardOffsetX = Math.cos(offsetRadians) * this.secondaryOffset.forward;
      const forwardOffsetY = Math.sin(offsetRadians) * this.secondaryOffset.forward;

      const perpendicularAngle = (this.angle + 90) * (Math.PI / 180);
      const sideOffsetX = Math.cos(perpendicularAngle) * this.secondaryOffset.side;
      const sideOffsetY = Math.sin(perpendicularAngle) * this.secondaryOffset.side;

      this.secondaryTrail.push({
        id,
        style: {
          left: `${this.position.x + forwardOffsetX + sideOffsetX}px`,
          top: `${this.position.y + forwardOffsetY + sideOffsetY}px`,
          transform: `rotate(${this.angle}deg)`,
          backgroundImage: `url(${pawImage})`,
        },
      });

      setTimeout(() => {
        this.secondaryTrail = this.secondaryTrail.filter((step) => step.id !== id);
      }, this.fadeOutDuration);
    },
    movePaw() {
      const nextX = this.position.x + this.direction.x * this.stepSize;
      const nextY = this.position.y + this.direction.y * this.stepSize;

      if (nextX < this.bounds.left || nextX > this.bounds.left + this.bounds.width) {
        this.reverseDirection('x');
      }
      if (nextY < this.bounds.top || nextY > this.bounds.top + this.bounds.height) {
        this.reverseDirection('y');
      }

      this.position.x += this.direction.x * this.stepSize;
      this.position.y += this.direction.y * this.stepSize;
    },
    maybeTurn() {
      if (Math.random() < 0.4) {
        const turnAngle = Math.random() * 80 - 40;
        this.angle += turnAngle;
        const radians = (this.angle * Math.PI) / 180;
        this.direction = {
          x: Math.cos(radians),
          y: Math.sin(radians),
        };
      }
    },
    reverseDirection(axis) {
      if (axis === 'x') this.direction.x *= -1;
      if (axis === 'y') this.direction.y *= -1;
      this.angle = Math.atan2(this.direction.y, this.direction.x) * (180 / Math.PI);
    },
  },
};
</script>

<style>
html,
body {
  height: auto;
  overflow: auto;
}
</style>
