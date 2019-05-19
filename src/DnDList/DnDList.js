import React, { Component } from 'react';
import './DnDList.css';
import { ReactComponent as Hamburger } from "./hamburger.svg";

export default class DnDList extends Component {
  state = {
    items: ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"]
  };

  onDragStartHandler = (event, index) => {
    this.draggedItem = this.state.items[index];

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.target.parentNode); // for firefox
    event.dataTransfer.setDragImage(event.target.parentNode, 20, 20); // for chrome
  }

  onDragOverHandler = (index) => {
    const draggedOverItem = this.state.items[index];

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = this.state.items.filter(item => item !== this.draggedItem);

    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem);

    this.setState({ items });
  };

  onDragEndHandler = () => {
    this.draggedIdx = null;
  };

  render() {
    return (
      <div className='dndList'>
        <main>
          <h2>List</h2>
          <ul>
            {
              this.state.items.map((item, index) => (
                <li key={item} onDragOver={() => this.onDragOverHandler(index)}>
                  <div
                    className='drag'
                    draggable
                    onDragStart={event => this.onDragStartHandler(event, index)}
                    onDragEnd={this.onDragEndHandler}
                  >
                    <Hamburger />
                  </div>
                  {item}
                </li>
              ))
            }
          </ul>
        </main>
      </div>
    )
  }
}
