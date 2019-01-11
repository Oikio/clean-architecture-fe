import * as React from 'react'


interface Props {
  text: string
}

export const TitleView: React.StatelessComponent<Props> = ({ text }) => <h1>{text}</h1>
