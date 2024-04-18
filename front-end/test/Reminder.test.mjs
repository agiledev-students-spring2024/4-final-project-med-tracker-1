import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Reminder from './Reminder';
import ReminderCard from './ReminderCard';

describe('<Reminder />', () => {
    it('renders the reminder page with a title', () => {
        const wrapper = mount(<Reminder />);
        expect(wrapper.find('.app-title').text()).to.include('Take');
    });

    it('renders a <ReminderCard /> component', () => {
        const wrapper = mount(<Reminder />);
        expect(wrapper.find(ReminderCard)).to.have.lengthOf(1);
    });

    // Add more tests to simulate user interactions, check for state changes, etc.
});

