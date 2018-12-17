import * as React from 'react'

import { TitleView } from './TitleView'

interface Props {
  text: string
}

export const Title: React.StatelessComponent<Props> = ({ text }) => {
  console.error('should not')
  return <TitleView text={text} />
}
