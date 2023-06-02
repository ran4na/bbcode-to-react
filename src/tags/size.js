// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class SizeTag extends Tag {

  getFontSize() {
    if (this.props.fontSizes && this.props.fontSizes[this.params.size]) {
      return this.props.fontSizes[this.params.size];
    } else if (!isNaN(this.params.size)) {
      return `${this.params.size}px`;
    }
    return 0;
  }

  toHTML() {
    const size = this.getFontSize();
    if (size == 0) {
      return this.getContent();
    }
    return [`<span style="font-size:${size}">`, this.getContent(), '</span>'];
  }

  toReact() {
    const size = this.getFontSize();
    if (size == 0) {
      console.log("Returning components");
      return this.getComponents();
    }
    return (
      <span style={{ fontSize: `${size}` }}>{this.getComponents()}</span>
    );
  }
}

