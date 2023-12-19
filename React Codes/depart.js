import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Department() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicDeptId">
        <Form.Label>Department Id</Form.Label>
        <Form.Control type="int" placeholder="Enter department id" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDeptName">
        <Form.Label>Department Name</Form.Label>
        <Form.Control type="text" placeholder="Department Name" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Department;