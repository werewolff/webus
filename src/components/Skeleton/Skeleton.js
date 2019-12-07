/* eslint-disable no-loops/no-loops,no-plusplus */
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Skeleton.scss';

/* EXAMPLE
 * <Skeleton
 *    count={5}
 *    height={10}
 *    width={10}
 *    circle={true}
 * />
 *
 * <h1>{this.props.title || <Skeleton />}</h1>
 *
 */

export default class Skeleton extends PureComponent {
  static propTypes = {
    count: PropTypes.number,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    circle: PropTypes.bool,
  };

  static defaultProps = {
    count: 1,
    width: null,
    height: null,
    circle: false,
  };

  render() {
    const {
      count, width, height, circle,
    } = this.props;
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      const style = {};
      if (width !== null) {
        style.width = width;
      }
      if (height !== null) {
        style.height = height;
      }
      if (width !== null && height !== null && circle) {
        style.borderRadius = '50%';
      }
      skeletons.push(
        <span key={i} className="skeleton" style={style}>
          &zwnj;
        </span>,
      );
    }

    return (
      <Fragment>
        {skeletons}
      </Fragment>
    );
  }
}
