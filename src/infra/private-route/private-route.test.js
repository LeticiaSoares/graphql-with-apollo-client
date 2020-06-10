import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import PrivateRoute from './private-route'
import { MemoryRouter } from 'react-router'

describe('<PrivateRoute />', () => {
    const memoryRouter = <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <PrivateRoute component={() => (<div />)} href='#test' />
    </MemoryRouter>
    Object.defineProperty(
        window,
        'localStorage',
        function () {
            let _storage = {}
            return {
                getItem: function _get (_id) {
                    return _storage._id
                },
                setItem: function _set (_id, _value) {
                    console.log('setItem', _value)
                    _storage = {
                        _id: _value
                    }
                }
            }
        }
    )
    it('renders with snapshot', () => {
        const wrapper = mount(memoryRouter)
        expect(toJSON(wrapper)).toMatchSnapshot()
    })
    it('renders with token', () => {
        localStorage.setItem('auth', JSON.stringify({ token: 'token123456' }))
        const wrapper = mount(memoryRouter)
        expect(wrapper.find('div').exists()).toEqual(true)
    })
    it('renders without token and navigation', () => {
        localStorage.setItem('auth', '')
        mount(memoryRouter)
        expect(window.location.href.split('#')[1]).toEqual('test')
    })
})
