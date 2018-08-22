import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import workspace from '@/components/workspace.vue';

describe('workspace.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(workspace, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
