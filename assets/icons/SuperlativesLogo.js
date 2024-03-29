import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SuperlativesLogo(props) {
  return (
    <Svg
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={"0 0 39 30"}
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.398 0h26.023v3.615h3.392c2.58 0 3.956 3.04 2.256 4.979l-5.648 6.44V18c0 6.627-5.373 12-12 12h-2.023c-6.627 0-12-5.373-12-12v-2.967L.75 8.593C-.95 6.656.427 3.616 3.006 3.616h3.392V0zm0 5.615H3.006c-.86 0-1.319 1.013-.752 1.66L6.398 12V5.615zM32.421 12V5.615h3.392c.86 0 1.319 1.013.752 1.66L32.421 12z"
        fill="#fff"
      />
      <Path
        d="M7 1h24.023v17c0 6.075-4.925 11-11 11H18c-6.075 0-11-4.925-11-11V1z"
        fill="#2CB67D"
        stroke="#fff"
        strokeWidth={2}
      />
      <Path
        d="M19.06 19.16c-.893 0-1.767-.107-2.62-.32-.853-.227-1.533-.507-2.04-.84l1.04-2.24c.48.307 1.06.56 1.74.76.68.187 1.347.28 2 .28 1.32 0 1.98-.327 1.98-.98 0-.307-.18-.527-.54-.66-.36-.133-.913-.247-1.66-.34-.88-.133-1.607-.287-2.18-.46a3.452 3.452 0 01-1.5-.92c-.413-.44-.62-1.067-.62-1.88 0-.68.193-1.28.58-1.8.4-.533.973-.947 1.72-1.24.76-.293 1.653-.44 2.68-.44.76 0 1.513.087 2.26.26.76.16 1.387.387 1.88.68l-1.04 2.22a6.21 6.21 0 00-3.1-.8c-.667 0-1.167.093-1.5.28-.333.187-.5.427-.5.72 0 .333.18.567.54.7.36.133.933.26 1.72.38.88.147 1.6.307 2.16.48.56.16 1.047.46 1.46.9.413.44.62 1.053.62 1.84 0 .667-.2 1.26-.6 1.78-.4.52-.987.927-1.76 1.22-.76.28-1.667.42-2.72.42z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SuperlativesLogo;