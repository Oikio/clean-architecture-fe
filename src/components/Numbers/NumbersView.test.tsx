import { shallow } from 'enzyme'
import * as React from 'react'

import { NumbersView, Props } from './NumbersView'
import * as sinon from 'sinon'

const props: Props = {
  numbers: [],
  evenNumbers: [],
  warning: 'none',
  get lengthOfArray() { return this.numbers.length },
  setNumbersLength: sinon.fake(),
  clearNumbers: sinon.fake(),
  updateLengthOfArray: sinon.fake()
}

test('?', () => {
  const wrapper = shallow(<NumbersView {...props} />)
  expect(wrapper.find('form').length).toEqual(1)
})
