<Form.Group className="mb-3">
  <Form.Control
    type="text"
    placeholder="Enter your phone or email ID"
    maxLength=""
    value={mobileNumber}
    onChange={(e) => setMobileNumber(e.target.value)}
    onBlur={() => handleBlur('mobileNumber')}
    className={`form-input ${touched.mobileNumber && !validateInput(mobileNumber) ? 'is-invalid' : ''}`}
  />
  {touched.mobileNumber && !validateInput(mobileNumber) && (
    <div className="invalid-feedback">Please enter a valid email ID or phone number.</div>
  )}
</Form.Group>