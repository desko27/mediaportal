import * as CSS from 'csstype'
import * as DND from 'react-beautiful-dnd'

declare module 'csstype' {
  interface Properties extends CSS.Properties {
    // Allow the usage of CSS variables
    [key: `--${string}`]: string | number
  }
}

declare module 'react-beautiful-dnd' {
  interface DraggingStyle extends DND.DraggingStyle, CSS.Properties {}
  interface NotDraggingStyle extends DND.NotDraggingStyle, CSS.Properties {}
}
