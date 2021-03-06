import React from "react"
import { graphql, StaticQuery } from "gatsby"
import tw from "twin.macro"

import NavMenu from "./NavMenu"
import { Heading1 } from "../utils/typography"

type HeaderProps = {
    titleId: number
    category: string
}

type TitleProps = {
    titleId: number
    rawData: {
        name: string
        node_locale: string
        order: number
    }[]
}

const Title = (props: TitleProps) => {
    const title = props.rawData.filter(function (el) {
        return el.order === props.titleId
    })
    // ⚠️ displaying only Chinese title rn
    return <Heading1>{title[0].name}</Heading1>
}

export default function Header(props: HeaderProps) {
    const Container = tw.header`flex flex-col items-center justify-between`
    return (
        <StaticQuery
            query={graphql`
                query {
                    titles: allContentfulMenuLinks(
                        filter: { category: { eq: "navbar" } }
                        sort: { order: ASC, fields: order }
                    ) {
                        nodes {
                            name
                            node_locale
                            order
                        }
                    }
                    menuLinks: allContentfulMenuLinks(
                        sort: { fields: order, order: ASC }
                    ) {
                        nodes {
                            name
                            link
                            node_locale
                            order
                            category
                        }
                    }
                }
            `}
            render={data => (
                <Container>
                    <Title
                        titleId={props.titleId}
                        rawData={data.titles.nodes}
                    ></Title>
                    <NavMenu
                        category={props.category}
                        menuLinks={data.menuLinks.nodes}
                        partiallyActive={false}
                    />
                </Container>
            )}
        />
    )
}
