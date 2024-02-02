import Smoke1 from '@assets/smokes/smoke_1.svg'
import Smoke2 from '@assets/smokes/smoke_2.svg'
import Smoke3 from '@assets/smokes/smoke_3.svg'
import Smoke4 from '@assets/smokes/smoke_4.svg'
import Smoke5 from '@assets/smokes/smoke_5.svg'
import Smoke6 from '@assets/smokes/smoke_6.svg'
import Smoke7 from '@assets/smokes/smoke_7.svg'
import Smoke8 from '@assets/smokes/smoke_8.svg'
import Smoke9 from '@assets/smokes/smoke_9.svg'
import Smoke10 from '@assets/smokes/smoke_10.svg'
import React from 'react'

export const smokeSvgs = [
  Smoke1,
  Smoke2,
  Smoke3,
  Smoke4,
  Smoke5,
  Smoke6,
  Smoke7,
  Smoke8,
  Smoke9,
  Smoke10,
]

// Ensure that each component is wrapped with React.memo if not already
export const MemoizedSmoke1 = React.memo(Smoke1)
export const MemoizedSmoke2 = React.memo(Smoke2)
export const MemoizedSmoke3 = React.memo(Smoke3)
export const MemoizedSmoke4 = React.memo(Smoke4)
export const MemoizedSmoke5 = React.memo(Smoke5)
export const MemoizedSmoke6 = React.memo(Smoke6)
export const MemoizedSmoke7 = React.memo(Smoke7)
export const MemoizedSmoke8 = React.memo(Smoke8)
export const MemoizedSmoke9 = React.memo(Smoke9)
export const MemoizedSmoke10 = React.memo(Smoke10)
// Repeat for Smoke3 to Smoke10

export const smokeSvgsMemoized = [
  MemoizedSmoke1,
  MemoizedSmoke2,
  Smoke3,
  Smoke4,
  Smoke5,
  Smoke6,
  Smoke7,
  Smoke8,
  Smoke9,
  Smoke10,
]
