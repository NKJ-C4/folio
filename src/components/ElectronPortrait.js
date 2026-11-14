import React, { Component } from 'react';
import './ElectronPortrait.css';

const TAU = Math.PI * 2;
const ORBITS = [
  { angle: -58, color: '#c7f36b', period: 24 },
  { angle: 58, color: '#55d9c0', period: 30 },
  { angle: -5, color: '#b7d9c9', period: 36 },
];

const SKILLS = [
  { name: 'Cloud & Infrastructure', position: 'cloud', orbit: 0, phase: 0.15 },
  { name: 'Frontend', position: 'frontend', orbit: 1, phase: 5.65 },
  { name: 'REST APIs', position: 'apis', orbit: 2, phase: 0.2 },
  { name: 'Product delivery', position: 'product', orbit: 0, phase: 3.1 },
  { name: 'LLMs', position: 'llms', orbit: 1, phase: 2.2 },
];

// Project a tilted circular orbit. Its two halves sit on opposite sides
// of the portrait, so the electrons actually travel behind and in front.
function orbitPoint(orbit, phase) {
  const angle = orbit.angle * Math.PI / 180;
  const x = 232 * Math.cos(phase);
  const y = 88 * Math.sin(phase);

  return {
    x: 260 + x * Math.cos(angle) - y * Math.sin(angle),
    y: 290 + x * Math.sin(angle) + y * Math.cos(angle),
    depth: Math.sin(phase),
  };
}

function orbitPath(orbit, front) {
  return Array.from({ length: 65 }, (_, step) => {
    const phase = (front ? 0 : Math.PI) + step / 64 * Math.PI;
    const point = orbitPoint(orbit, phase);
    return `${step === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }).join(' ');
}

const PATHS = ORBITS.map(orbit => ({
  front: orbitPath(orbit, true),
  back: orbitPath(orbit, false),
}));

class ElectronPortrait extends Component {
  state = { paused: false, reducedMotion: false, activeOrbit: null };
  root = React.createRef();
  particles = { front: [], back: [] };
  elapsed = 0;
  lastTime = null;
  frame = null;
  visible = true;

  componentDidMount() {
    this.motionQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (this.motionQuery) {
      if (this.motionQuery.addEventListener) {
        this.motionQuery.addEventListener('change', this.updateMotionPreference);
      } else {
        this.motionQuery.addListener(this.updateMotionPreference);
      }
    }

    if (window.IntersectionObserver) {
      this.observer = new IntersectionObserver(([entry]) => {
        this.visible = entry.isIntersecting;
        this.syncAnimation();
      });
      this.observer.observe(this.root.current);
    }

    document.addEventListener('visibilitychange', this.syncAnimation);
    this.updateMotionPreference();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
    if (this.observer) this.observer.disconnect();
    if (this.motionQuery) {
      if (this.motionQuery.removeEventListener) {
        this.motionQuery.removeEventListener('change', this.updateMotionPreference);
      } else {
        this.motionQuery.removeListener(this.updateMotionPreference);
      }
    }
    document.removeEventListener('visibilitychange', this.syncAnimation);
  }

  updateMotionPreference = () => {
    this.resetTilt();
    this.setState({ reducedMotion: !!(this.motionQuery && this.motionQuery.matches) }, this.syncAnimation);
  };

  syncAnimation = () => {
    cancelAnimationFrame(this.frame);
    this.frame = null;
    this.lastTime = null;
    if (!this.state.paused && !this.state.reducedMotion && this.visible && !document.hidden) {
      this.frame = requestAnimationFrame(this.animate);
    }
  };

  animate = time => {
    if (this.lastTime !== null) this.elapsed += Math.min(time - this.lastTime, 64) / 1000;
    this.lastTime = time;

    SKILLS.forEach((skill, index) => {
      const orbit = ORBITS[skill.orbit];
      const phase = skill.phase + this.elapsed * TAU / orbit.period;
      const point = orbitPoint(orbit, phase);

      ['back', 'front'].forEach(layer => {
        const particle = this.particles[layer][index];
        if (!particle) return;
        const visible = layer === 'front' ? point.depth >= 0 : point.depth < 0;
        particle.setAttribute('transform', `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
        particle.style.opacity = visible ? 1 : 0;
      });
    });

    this.frame = requestAnimationFrame(this.animate);
  };

  moveTilt = event => {
    if (event.pointerType === 'touch' || this.state.reducedMotion || this.state.paused) return;
    const bounds = this.root.current.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    this.root.current.style.setProperty('--pointer-x', x.toFixed(3));
    this.root.current.style.setProperty('--pointer-y', y.toFixed(3));
  };

  resetTilt = () => {
    if (!this.root.current) return;
    this.root.current.style.setProperty('--pointer-x', 0);
    this.root.current.style.setProperty('--pointer-y', 0);
  };

  toggleAnimation = () => {
    this.resetTilt();
    this.setState(state => ({ paused: !state.paused }), this.syncAnimation);
  };

  renderOrbits(layer) {
    const front = layer === 'front';

    return (
      <svg className={`electron-orbits electron-orbits-${layer}`} viewBox="0 0 520 580" aria-hidden="true">
        {ORBITS.map((orbit, index) => (
          <g
            key={index}
            className={this.state.activeOrbit === index ? 'electron-orbit is-highlighted' : 'electron-orbit'}
            style={{ color: orbit.color }}
          >
            <path className="electron-track" d={PATHS[index][layer]} vectorEffect="non-scaling-stroke" />
            {SKILLS.map((skill, skillIndex) => {
              if (skill.orbit !== index) return null;
              const point = orbitPoint(orbit, skill.phase);
              const visible = front ? point.depth >= 0 : point.depth < 0;
              return (
                <g
                  key={skill.name}
                  ref={element => { this.particles[layer][skillIndex] = element; }}
                  className="electron-particle"
                  transform={`translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`}
                  style={{ opacity: visible ? 1 : 0 }}
                >
                  <circle className="electron-halo" r="11" />
                  <circle className="electron-dot" r={front ? '3.8' : '3'} />
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    );
  }

  render() {
    const { name } = this.props;
    const { paused, reducedMotion } = this.state;

    return (
      <figure
        className={`hero-portrait${paused || reducedMotion ? ' is-still' : ''}`}
        ref={this.root}
        onPointerMove={this.moveTilt}
        onPointerLeave={this.resetTilt}
        onPointerCancel={this.resetTilt}
        aria-label={`${name}, surrounded by engineering specialties`}
      >
        <div className="electron-scene">
          <div className="electron-aura" aria-hidden="true" />
          {this.renderOrbits('back')}
          <img className="electron-portrait-image" src="images/hero-green-cutout.png" alt={name} width="1122" height="1402" fetchpriority="high" />
          {this.renderOrbits('front')}
          <ul className="electron-skills" aria-label="Engineering specialties">
            {SKILLS.map(skill => (
              <li className={`electron-skill electron-skill-${skill.position}`} key={skill.name} style={{ '--orbit-color': ORBITS[skill.orbit].color }}>
                <a
                  href="#capabilities"
                  onMouseEnter={() => this.setState({ activeOrbit: skill.orbit })}
                  onMouseLeave={() => this.setState({ activeOrbit: null })}
                  onFocus={() => this.setState({ activeOrbit: skill.orbit })}
                  onBlur={() => this.setState({ activeOrbit: null })}
                >
                  <span aria-hidden="true" />{skill.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {!reducedMotion && (
          <button className="electron-motion-toggle" type="button" onClick={this.toggleAnimation} aria-label={paused ? 'Resume orbital animation' : 'Pause orbital animation'}>
            <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
              {paused ? <path d="M4 2.5 13 8l-9 5.5z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}
            </svg>
            {paused ? 'Resume motion' : 'Pause motion'}
          </button>
        )}
      </figure>
    );
  }
}

export default ElectronPortrait;
