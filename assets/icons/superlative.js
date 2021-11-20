import * as React from "react"
import Svg, { Path, Defs, RadialGradient, Stop } from "react-native-svg"

function SuperlativeIcon(props) {
  return (
    <Svg
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={"0 0 28 24"}
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.939 19c.02.027.04.055.061.081V19h-.061zM3.006 2.692C.499 2.692-.902 5.585.65 7.552l3.85 4.875v2.198a9.375 9.375 0 0018.75 0v-2.198l3.85-4.875c1.555-1.967.153-4.86-2.354-4.86h-1.496V0H4.501v2.692H3.007zm0 2a1 1 0 00-.785 1.62L4.5 9.2V4.692H3.007zm22.526 1.62L23.252 9.2V4.692h1.495a1 1 0 01.785 1.62z"
        fill="url(#prefix__paint0_radial_235_133)"
      />
      <Defs>
        <RadialGradient
          id="prefix__paint0_radial_235_133"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 12 -13.8766 0 13.877 12)"
        >
          <Stop stopColor="#FFE453" stopOpacity={0} />
          <Stop offset={0} stopColor="#fff" />
          <Stop offset={0.995} stopColor="gold" />
        </RadialGradient>
      </Defs>
    </Svg>
  )
}

export default SuperlativeIcon