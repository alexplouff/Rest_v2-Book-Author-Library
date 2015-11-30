/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.wctc.asp.mavenproject3.service;

import edu.wctc.asp.mavenproject3.entity.Author;
import edu.wctc.asp.mavenproject3.entity.Book;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 *
 * @author alex
 */
@Stateless
@Path("v1/books")
public class BookFacadeREST extends AbstractFacade<Book> {
    @PersistenceContext(unitName = "edu.wctc.asp_Rest_v2_war_1.0-SNAPSHOTPU")
    private EntityManager em;
    private Author author;
    private AuthorFacadeREST authorService;
    public BookFacadeREST() {
        super(Book.class);
    }

    @POST
    @Override
    @Consumes({"application/json"})
    public void create(Book entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}/{authorID}")
    @Consumes({"application/json"})
    public void edit(@PathParam("id") Integer id, @PathParam("authorID") Integer authorID, Book entity) {
        author = authorService.find(authorID);
        entity.setAuthorID(author);
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/json"})
    public Book find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    
    
    @GET
    @Override
    @Produces({"application/json"})
    public List<Book> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/json"})
    public List<Book> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
