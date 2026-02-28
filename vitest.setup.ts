import { config } from '@vue/test-utils';

// Stub Nuxt-specific components used in tests
config.global.stubs = {
  NuxtImg: {
    template: '<img />',
  },
  BaseBtn: {
    props: ['to', 'label'],
    template: '<button><slot>{{ label }}</slot></button>',
  },
  Icon: {
    props: ['name'],
    template: '<span />',
  },
};
