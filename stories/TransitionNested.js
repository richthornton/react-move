import React, { Component } from 'react'
import _ from 'lodash'
//
import Transition from '../src/Transition'
import Animate from '../src/Animate'
//
import source from '!raw-loader!./CustomEasing'
import CodeHighlight from './components/codeHighlight'

class Story extends Component {
  constructor () {
    super()
    this.state = {
      items: makeItems()
    }
  }
  render () {
    const {
      items
    } = this.state

    return (
      <div>
        <p>
          You can easily layer animation components within each other. Here, the background, the item positions, and the item opacities are all controlled with different nested components.
        </p>

        <br />
        <br />

        <button
          onClick={() => this.setState({
            items: makeItems()
          })}
        >
          Randomize Data
        </button>

        <br />
        <br />

        <Animate
          data={{
            background: Math.random() > 0.5 ? '#6748cd' : '#1bc38d'
          }}
        >
          {data => (
            <div style={{
              padding: '20px',
              background: data.background
            }}>
              <Transition
                data={items}
                getKey={d => d.value}
                update={d => ({
                  translate: 1,
                  opacity: 1,
                  color: 'white'
                })}
                enter={d => ({
                  translate: 0,
                  opacity: 0,
                  color: '#79cfff'
                })}
                leave={d => ({
                  translate: 2,
                  opacity: 0,
                  color: '#ff7d7d'
                })}
                ignore={['opacity']}
              >
                {data => (
                  <div style={{
                    height: (20 * 100) + 'px'
                  }}>
                    {data.map(d => (
                      <div
                        key={d.key}
                        style={{
                          fontWeight: 'bold',
                          position: 'absolute',
                          transform: `translate(${100 * d.state.translate}px, ${20 * d.key}px)`,
                          color: d.state.color
                        }}
                      >
                        <Animate
                          data={{
                            opacity: d.state.opacity
                          }}
                        >
                          {data => {
                            return (
                              <span
                                style={{
                                  opacity: data.opacity
                                }}
                              >{d.key} - {Math.round(d.progress * 100)}</span>
                            )
                          }}
                        </Animate>
                      </div>
                    ))}
                  </div>
                )}
              </Transition>
            </div>
          )}
        </Animate>

        <br />
        <br />

        Source:
        <CodeHighlight>{() => source}</CodeHighlight>

        <br />
        <br />
      </div>
    )
  }
}

export default () => <Story />

let include
function makeItems () {
  include = !include
  return _.filter(
    _.map(_.range(100), d => ({
      value: d
    })),
    (d, i) => Math.random() * 100 > i
  )
}
