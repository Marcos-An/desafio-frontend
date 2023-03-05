describe('Watch page', () => {
  beforeEach(() => {
    cy.visit('/channel/UCw5-xj3AKqEizC7MvHaIPqA')
  })

  it('should have channel infos', () => {
    cy.findAllByTestId('channelName').should('exist')
    cy.findAllByTestId('channelCustomUrl').should('exist')
    cy.findAllByTestId('channelSubscribers').should('exist')
  })

  it('should have filter button', () => {
    cy.findByText('Enviados recentemente').should('exist')
    cy.findByText('Populares').should('exist')
  })

  it('should have videos grid', () => {
    cy.get('.videoGridContainer_videoGrid__cFdqS')
      .children()
      .should('have.length', 20)
  })
})

export {}
