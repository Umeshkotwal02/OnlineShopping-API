<div key={index} className="border border-light mb-2 p-4 discount-coupon">
                        <Row className="align-items-center">
                          <Col xs={2} className="text-center">
                            <div className="text-white px-3 py-1 rounded">
                              <img
                                src={require("../assets/images/ProductDetails/discount-bag.png")}
                                alt="Product"
                                className="discount-bag"
                              />
                            </div>
                          </Col>
                          <Col xs={6}>
                            <h2 className="fw-bolder">{item.heading}</h2>
                            <h5 style={{ color: "#515151" }}>Use Code: {item.name}</h5>
                          </Col>
                          <Col xs={4} className="text-center">
                            <button className="coupon-btn" onClick={() => alert(`Copied: ${item.name}`)}>
                              COPY
                            </button>
                          </Col>
                        </Row>
                      </div>