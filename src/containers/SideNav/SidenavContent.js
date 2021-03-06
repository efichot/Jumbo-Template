import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import IntlMessages from 'util/IntlMessages'
import CustomScrollbars from 'util/CustomScrollbars'
import Tooltip from '@material-ui/core/Tooltip'
import Context from 'context'

class SidenavContent extends Component {
  static contextType = Context

  componentDidUpdate = (prevProps, prevState) => {
    const subMenuLi = document.querySelectorAll('.sub-menu > li')
    for (let i = 0; i < subMenuLi.length; i++) {
      if (subMenuLi[i].firstChild.classList[0] === 'active') {
        subMenuLi[i].parentElement.parentElement.classList.add('open')
      }
    }
  }

  componentDidMount () {
    const { history } = this.props
    const that = this
    const pathname = `${history.location.pathname}` // get current path

    const menuLi = document.getElementsByClassName('menu')
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function (event) {
        for (let j = 0; j < menuLi.length; j++) {
          const parentLi = that.closest(this, 'li')
          if (
            menuLi[j] !== this &&
            (parentLi === null || !parentLi.classList.contains('open'))
          ) {
            menuLi[j].classList.remove('open')
          }
        }
        this.classList.toggle('open')
      }
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]') // select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul') // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open')
      } else {
        this.closest(activeLi, 'li').classList.add('open')
      }
    } catch (error) {}
  }

  closest (el, selector) {
    try {
      let matchesFn
      // find vendor prefix
      ;[
        'matches',
        'webkitMatchesSelector',
        'mozMatchesSelector',
        'msMatchesSelector',
        'oMatchesSelector'
      ].some(function (fn) {
        if (typeof document.body[fn] === 'function') {
          matchesFn = fn
          return true
        }
        return false
      })

      let parent

      // traverse parents
      while (el) {
        parent = el.parentElement
        if (parent && parent[matchesFn](selector)) {
          return parent
        }
        el = parent
      }
    } catch (e) {}

    return null
  }

  render () {
    const { settings: { drawerType } } = this.context
    const toolTip = drawerType === 'mini_drawer'

    return (
      <CustomScrollbars className=' scrollbar'>
        <ul className='nav-menu'>
          {/* Main */}
          <li className='nav-header'>
            <IntlMessages id='sidebar.main' />
          </li>
          <li className='menu no-arrow'>
            {toolTip &&
              <Tooltip
                title={<IntlMessages id='sidebar.dashboard' />}
                placement='right'
              >
                <NavLink to='/app/dashboard'>
                  <i className='zmdi zmdi-view-dashboard' />
                </NavLink>
              </Tooltip>}
            {!toolTip &&
              <NavLink to='/app/dashboard'>
                <i className='zmdi zmdi-view-dashboard' />
                <span className='nav-text'>
                  <IntlMessages id='sidebar.dashboard' />
                </span>
              </NavLink>}
          </li>

          {/* Modules */}
          <li className='nav-header'>
            <IntlMessages id='sidebar.modules' />
          </li>
          <li className='menu no-arrow'>
            {toolTip &&
              <Tooltip
                title={<IntlMessages id='sidebar.appModule.chat' />}
                placement='right'
              >
                <NavLink to='/app/chat'>
                  <i className='zmdi zmdi-comments' />
                </NavLink>
              </Tooltip>}
            {!toolTip &&
              <NavLink to='/app/chat'>
                <i className='zmdi zmdi-comments' />
                <span className='nav-text'>
                  <IntlMessages id='sidebar.appModule.chat' />
                </span>
              </NavLink>}
          </li>
          <li className='menu no-arrow'>
            {toolTip &&
              <Tooltip
                title={<IntlMessages id='sidebar.appModule.toDo' />}
                placement='right'
              >
                <NavLink to='/app/todo'>
                  <i className='zmdi zmdi-check-square' />
                </NavLink>
              </Tooltip>}
            {!toolTip &&
              <NavLink to='/app/todo'>
                <i className='zmdi zmdi-check-square' />
                <span className='nav-text'>
                  <IntlMessages id='sidebar.appModule.toDo' />
                </span>
              </NavLink>}
          </li>

          {/* Extras */}
          <li className='nav-header'>
            <IntlMessages id='sidebar.extras' />
          </li>
          <li className='menu arrow'>
            <Button href='javascript:void(0)'>
              <i className='zmdi zmdi-chevron-down' />
              <span className='nav-text'>
                <IntlMessages id='sidebar.menuLevels' />
              </span>
            </Button>
            <ul className='sub-menu'>
              <li>
                {toolTip &&
                  <Tooltip
                    title={<IntlMessages id='sidebar.menuLevels.level1' />}
                    placement='right'
                  >
                    <NavLink to='/app/link1'>
                      <i className='zmdi zmdi-n-1-square' />
                    </NavLink>
                  </Tooltip>}
                {!toolTip &&
                  <NavLink to='/app/link1'>
                    <i className='zmdi zmdi-n-1-square' />
                    <span className='nav-text'>
                      <IntlMessages id='sidebar.menuLevels.level1' />
                    </span>
                  </NavLink>}
              </li>
              <li>
                {toolTip &&
                  <Tooltip
                    title={<IntlMessages id='sidebar.menuLevels.level2' />}
                    placement='right'
                  >
                    <NavLink to='/app/link2'>
                      <i className='zmdi zmdi-n-2-square' />
                    </NavLink>
                  </Tooltip>}
                {!toolTip &&
                  <NavLink to='/app/link2'>
                    <i className='zmdi zmdi-n-2-square' />
                    <span className='nav-text'>
                      <IntlMessages id='sidebar.menuLevels.level2' />
                    </span>
                  </NavLink>}
              </li>
            </ul>
          </li>
        </ul>
      </CustomScrollbars>
    )
  }
}

export default withRouter(SidenavContent)
