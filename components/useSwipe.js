function useSwipe(onSwipe) {
  // console.log('Swipe : useSwipe()');

  let touchStartX = 0;

  function onTouchStart(e) {
    console.log(`Swipe : onTouchStart : pageX = ${e.nativeEvent.pageX}`);
    touchStartX = e.nativeEvent.pageX;
  }

  function onTouchEnd(e) {
    const gapX = e.nativeEvent.pageX - touchStartX;

    console.log(`Swipe : onTouchEnd : touchStartX = ${touchStartX}, pageX = ${e.nativeEvent.pageX}, gapX = ${gapX}`);

    onSwipe && onSwipe(gapX);
  }

  return { onTouchStart, onTouchEnd };
}

export default useSwipe;

// function useSwipe(onSwipeLeft, onSwipeRight, rangeOffset = 4) {
//   console.log(3);

//   let firstTouch = 0;

//   // set user touch start position
//   function onTouchStart(e) {
//     firstTouch = e.nativeEvent.pageX;
//     console.log('--- start');
//   }

//   // when touch ends check for swipe directions
//   function onTouchEnd(e) {
//     console.log('--- end');
//     // get touch position and screen size
//     const positionX = e.nativeEvent.pageX;
//     const range = windowWidth / rangeOffset;

//     // check if position is growing positively and has reached specified range
//     if (positionX - firstTouch > range) {
//       onSwipeRight && onSwipeRight();
//     }
//     // check if position is growing negatively and has reached specified range
//     else if (firstTouch - positionX > range) {
//       onSwipeLeft && onSwipeLeft();
//     }
//   }

//   return { onTouchStart, onTouchEnd };
// }
