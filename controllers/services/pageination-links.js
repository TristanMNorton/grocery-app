/**
 *  Author: Tristan Norton 2019
 *
 * @function paginationLinks
 * @param  {Object} req Express request object
 * @param  {Object} paginatedData Pagination data provided by mongoose pagination lib
 * @return {Object} Object of relevant paginated links
 */

module.exports = (req, paginatedData) => {
  const nextPage = paginatedData.nextPage
  const prevPage = paginatedData.prevPage

  const links = {
    self: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
    related: `${req.protocol}://${req.headers.host}${req.baseUrl}`
  }

  if (nextPage) {
    links.next = `${req.protocol}://${req.headers.host}${req.baseUrl}?page=${nextPage}`
  }

  if (prevPage) {
    links.last = `${req.protocol}://${req.headers.host}${req.baseUrl}?page=${prevPage}`
  }

  return links
}
