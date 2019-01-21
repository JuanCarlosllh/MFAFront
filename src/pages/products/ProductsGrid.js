import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Card } from 'antd'

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
const ProductCard = styled(Card)`
  margin: 1%;
  flex-basis: 16%;
`

export const ProductsGrid = ({ products }) => {
  console.log(products)
  return (
    <GridContainer>
      {products.map(({ id, image, name, type }) => (
        <ProductCard
          key={id}
          hoverable
          style={{ width: 240 }}
          cover={<img alt='example' src={image} />}
        >
          <Card.Meta title={name} description={type} />
        </ProductCard>
      ))}
    </GridContainer>
  )
}

ProductsGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string
    })
  )
}

ProductsGrid.defaultProps = {
  products: []
}
