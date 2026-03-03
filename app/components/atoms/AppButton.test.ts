import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppButton from './AppButton.vue';

// Stub NuxtLink so it renders as a plain <a> in tests
const NuxtLink = {
  name: 'NuxtLink',
  props: ['to'],
  template: '<a :href="to"><slot /></a>',
};

const globalStubs = { NuxtLink };

describe('AppButton', () => {
  it('renders a <button> by default', () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Click me' },
      global: { stubs: globalStubs },
    });
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.text()).toBe('Click me');
  });

  it('renders a NuxtLink when "to" prop is provided', () => {
    const wrapper = mount(AppButton, {
      props: { to: '/o-mnie' },
      slots: { default: 'About' },
      global: { stubs: globalStubs },
    });
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('a').attributes('href')).toBe('/o-mnie');
  });

  it('renders an <a> with target="_blank" when "href" prop is provided', () => {
    const wrapper = mount(AppButton, {
      props: { href: 'https://example.com' },
      slots: { default: 'External' },
      global: { stubs: globalStubs },
    });
    const anchor = wrapper.find('a');
    expect(anchor.exists()).toBe(true);
    expect(anchor.attributes('target')).toBe('_blank');
    expect(anchor.attributes('rel')).toBe('noopener noreferrer');
  });

  it('applies the primary variant class by default', () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Primary' },
      global: { stubs: globalStubs },
    });
    expect(wrapper.find('button').classes()).toContain('app-button--primary');
  });

  it('applies the outline variant class when variant="outline"', () => {
    const wrapper = mount(AppButton, {
      props: { variant: 'outline' },
      slots: { default: 'Outline' },
      global: { stubs: globalStubs },
    });
    expect(wrapper.find('button').classes()).toContain('app-button--outline');
  });

  it('sets the correct button type', () => {
    const wrapper = mount(AppButton, {
      props: { type: 'submit' },
      slots: { default: 'Submit' },
      global: { stubs: globalStubs },
    });
    expect(wrapper.find('button').attributes('type')).toBe('submit');
  });
});
