import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Card, Icon } from 'antd'

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
const ProductCard = styled(Card)`
  width: 15rem;
  margin: 1%;
  flex-basis: 16%;
  .ant-card-meta-avatar {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
  }
`

const ProductImage = styled.img`
  object-fit: contain;
  height: 15rem;
  width: 100%;
  padding: 1rem;
`

const Price = styled.span`
  font-size: 1.2rem;
`

export const ProductsGrid = ({ products, actions }) => {
  return (
    <GridContainer>
      {products.map(({ id, image, name, price, isOnFavorites }) => (
        <ProductCard
          key={id}
          hoverable
          cover={<ProductImage alt={name} src={image} />}
          actions={actions.map(action => (
            <Icon
              type={action.icon}
              theme={isOnFavorites && 'filled'}
              onClick={() => action.onClick(id, action)}
            />
          ))}
        >
          <Card.Meta title={name} description={<Price>{price}€</Price>} />
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
  ),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      icon: PropTypes.string
    })
  )
}

ProductsGrid.defaultProps = {
  products: [],
  actions: [],
  onFavClick: () => {}
}
