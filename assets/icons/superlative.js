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
        d="M8.02 19l.051.067V19h-.05zM3.018 2.692c-2.512 0-3.912 2.905-2.346 4.87l3.87 4.856v2.124a9.458 9.458 0 0018.916 0v-2.124l3.87-4.856c1.566-1.965.166-4.87-2.346-4.87h-1.524V0H4.542v2.692H3.018zm0 2a1 1 0 00-.782 1.624l2.306 2.893V4.692H3.018zm22.746 1.624l-2.306 2.893V4.692h1.524a1 1 0 01.782 1.624z"
        fill="url(#prefix__paint0_radial_235_133)"
      />
      <Defs>
        <RadialGradient
          id="prefix__paint0_radial_235_133"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 12 -13.9872 0 14 12)"
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