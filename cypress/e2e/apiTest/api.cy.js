describe('Automation API Testing - Platzi Fake Store (Categories)', () => {
    const baseUrl = 'https://api.escuelajs.co/api/v1/categories';
    let categoryId; 

    it('GET - All Categories', () => {
        cy.request('GET', baseUrl).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.at.least(1);
        });
    });

    
    it('POST - Create Category', () => {
        const payload = {
            "name": "Test API",
            "image": "https://picsum.photos/640/640"
        };

        cy.request('POST', baseUrl, payload).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('name', 'Test API');
            expect(response.body).to.have.property('id');
            categoryId = response.body.id;
        });
    });

    
    it('POST - Create Category without image', () => {
        cy.request({
            method: 'POST',
            url: baseUrl,
            body: { "name": "No Image Category" },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.be.an('array');
        });
    });

    
    it('GET - Single Category by ID', () => {
        cy.request('GET', `${baseUrl}/${categoryId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', categoryId);
            expect(response.body).to.have.property('name');
        });
    });

    it('GET - Category with non-existent ID', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/999999`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.oneOf([400, 404]);
        });
    });
    
    //

    it('PUT - Update Category Name', () => {
        const updatePayload = {
            "name": "Updated Test API"
        };

        cy.request('PUT', `${baseUrl}/${categoryId}`, updatePayload).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'Updated Test API');
        });
    });

    it('GET - All products in a specific category', () => {
        cy.request('GET', `${baseUrl}/${categoryId}/products`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    
    it('DELETE - Category', () => {
        cy.request('DELETE', `${baseUrl}/${categoryId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.eq('true');
        });
    });
});