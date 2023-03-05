describe('Watch page', () => {
  beforeEach(() => {
    cy.visit('/watch/lMRr7O2ineA')
  })

  it('should load video iframe', () => {
    cy.wait(2000)
    cy.get('iframe').should('exist')
  })

  it('should load comments', () => {
    cy.wait(2000)
    cy.findAllByTestId('comments-wrapper').children().should('have.length', 22)
  })

  it('should load related', () => {
    cy.wait(2000)
    cy.get('.videoPage_videosWrapper__mNnDb').children().first().should('exist')
  })

  it('should go to channel page', () => {
    cy.wait(2000)
    cy.findAllByTestId('channel-title').click()

    cy.wait(2000)
    cy.findByText('Enviados recentemente').should('exist')
    cy.findByText('Populares').should('exist')
  })
})

export {}
