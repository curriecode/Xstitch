export default function reducer(state, action) {
  switch (action.type) {
    case "paint":
      return {
        ...state,
        pattern: state.pattern.map((row, rowIndex) => {
          if (rowIndex === action.location[0]) {
            return row.map((pixel, pixelIndex) => {
              if (pixelIndex === action.location[1]) {
                return (row[pixelIndex] = state.color);
              } else {
                return pixel;
              }
            });
          } else {
            return row;
          }
        })
      };
    case "setColor":
      return { ...state, color: action.value };
    case "pixelSize":
      return { ...state, pixelSize: action.size };
    case "title":
      return { ...state, title: action.title };
    case "description":
      return { ...state, description: action.description };
    case "imageURL":
      return { ...state, imageURL: action.imageURL };
    case "zIndex":
      return { ...state, zIndex: action.zIndex };
    case "addTop":
      const newRow = [];
      for (let i = 0; i < state.pattern[0].length; i++) {
        newRow.push("#ffffff00");
      }
      return { ...state, pattern: [newRow, ...state.pattern] };
    case "addBottom":
      const bottomRow = [];
      for (let i = 0; i < state.pattern[0].length; i++) {
        bottomRow.push("#ffffff00");
      }
      return { ...state, pattern: [...state.pattern, bottomRow] };
    case "addRight":
      let newPattern = [];
      state.pattern.forEach(row => {
        row.push("#ffffff00");
        newPattern.push(row);
      });
      return { ...state, pattern: newPattern };
    case "addLeft":
      const addLeft = [];
      state.pattern.forEach(row => {
        row.unshift("#ffffff00");
        addLeft.push(row);
      });
      return { ...state, pattern: addLeft };
    case "deleteTop":
      return {
        ...state,
        pattern: state.pattern.slice(1, state.pattern.length)
      };
    case "deleteBottom":
      return {
        ...state,
        pattern: state.pattern.slice(0, state.pattern.length - 1)
      };
    case "deleteRight":
      const deleteRight = [];
      state.pattern.forEach(row => {
        row.pop();
        deleteRight.push(row);
      });
      return { ...state, pattern: deleteRight };
    case "deleteLeft":
      const deleteLeft = [];
      state.pattern.forEach(row => {
        row.shift();
        deleteLeft.push(row);
      });
      return { ...state, pattern: deleteLeft };
    case "reset":
      // clears grid, blankPattern is dispatched as value
      return { ...state, pattern: action.value };
  }
}
