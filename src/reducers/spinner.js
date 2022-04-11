import { SPINNER } from '../actions/spinner'

export default function spinner (state = false, action) {
  switch (action.type) {
    case SPINNER :
      return action.boolean;
    default :
    return state
  }
}
