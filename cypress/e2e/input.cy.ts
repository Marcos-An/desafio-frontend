describe('Input behavior', () => {
  beforeEach(() => {
    cy.visit('/channel/UCw5-xj3AKqEizC7MvHaIPqA')
  })

  it('should go to Home on search', () => {
    cy.get('input').type('Manual do mundo').type('{enter}')
    cy.wait(1000)

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/')
    })
  })

  it('should click on logo and go to Home', () => {
    cy.get('.header_content__Ue69y > img').click()

    cy.get('.videoGridContainer_videoGrid__cFdqS')
      .children()
      .should('have.length', 20)
  })
})

export {}
