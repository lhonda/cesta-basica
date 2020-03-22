import React from 'react'
import { Title } from '../../components/Title'
import { SubTitle } from '../../components/SubTitle'
import { Terms } from '../../components/Terms'
import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import './Term.scss'


export default function TermsPage() {
  return (
    <div className="container">
        <div className="header">
            <Title message="Termos de compromisso"/>
        </div>
        <div className="main">
            <SubTitle message="1.1 Introducao"/>
            <Terms content="introduction" />
            <SubTitle message="1.2 Target"/>
            <Terms content="target" />
            <SubTitle message="2 Conclusion"/>
            <Terms content="conclusion" />
            <SubTitle message="2 Conclusion"/>
            <Terms content="conclusion" />
            <SubTitle message="2 Conclusion"/>
            <Terms content="conclusion" />
            <Checkbox message="Declaro que li e estou de acordo com os Termos de Uso da aplicacao"/>
        </div>
        <div className="footer">
            <Button type="outline" message="Cancelar"/>
            <Button message="Entrar"/>
        </div>
    </div>
  )
}
