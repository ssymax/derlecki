import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DecoratedHeading from './DecoratedHeading.vue';

describe('DecoratedHeading', () => {
  it('renders slot content inside the heading', () => {
    const wrapper = mount(DecoratedHeading, {
      slots: { default: 'Fizjoterapia' },
    });
    expect(wrapper.text()).toContain('Fizjoterapia');
  });

  it('renders an <h2> element', () => {
    const wrapper = mount(DecoratedHeading, {
      slots: { default: 'Heading' },
    });
    expect(wrapper.find('h2').exists()).toBe(true);
  });

  it('applies heading--left class by default', () => {
    const wrapper = mount(DecoratedHeading, {
      slots: { default: 'Left' },
    });
    expect(wrapper.find('h2').classes()).toContain('heading--left');
  });

  it('applies heading--right class when align="right"', () => {
    const wrapper = mount(DecoratedHeading, {
      props: { align: 'right' },
      slots: { default: 'Right' },
    });
    expect(wrapper.find('h2').classes()).toContain('heading--right');
  });

  it('renders the sparkle character', () => {
    const wrapper = mount(DecoratedHeading, {
      slots: { default: 'Test' },
    });
    expect(wrapper.find('.sparkle').text()).toBe('✦');
  });
});
