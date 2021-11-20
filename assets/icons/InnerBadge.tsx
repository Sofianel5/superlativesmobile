import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function InnerBadge(props: SvgProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={"0 0 16 22"}
      {...props}
    >
      <Path d="M0 0h16v14a8 8 0 11-16 0V0z" />
    </Svg>
  )
}

export default InnerBadge;
