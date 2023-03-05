describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should show loaded videos grid', () => {
    cy.get('.videoGridContainer_videoGrid__cFdqS')
      .children()
      .should('have.length', 20)
  })

  it('should load more on scroll', () => {
    cy.scrollTo('bottom', { duration: 2000 })
    cy.wait(1000)
    cy.get('.videoGridContainer_videoGrid__cFdqS')
      .children()
      .should('have.length.greaterThan', 20)
  })

  it('should search "manual do mundo" on input', () => {
    cy.wait(1000)
    cy.get('input').type('manual do mundo').type('{enter}')
    cy.wait(1000)
    cy.get('.videoGridContainer_videoGrid__cFdqS')
      .children()
      .should('have.length', 20)

    cy.get('.videoGridContainer_videoGrid__cFdqS')
      .children()
      .findByText('Manual do Mundo')
  })

  it('shouldnt find any video', () => {
    cy.wait(1000)
    cy.get('input').type('zxcvbnm12312').type('{enter}')
    cy.findByText('Não encontramos resultados para essa pesquisa').should(
      'exist'
    )
  })

  it('should go to /watch/[video-id]', () => {
    cy.wait(1000)
    cy.get('.videoGridContainer_videoGrid__cFdqS').children().first().click()

    cy.wait(1000)
    cy.findByTestId('video-title').should('exist')
  })
})

export {}
