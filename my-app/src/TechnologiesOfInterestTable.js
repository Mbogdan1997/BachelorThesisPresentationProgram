import React from "react";
import { Form,FormGroup, Label,Button} from "react-bootstrap";

class TechnologiesOfInterestTable extends React.Component {

    constructor(){
        super()
        this.state={technology:''}
    }

    onRowAdd(){
        this.props.onRowAdd(this.state.technology)
    }

    addFields(){
        this.props.addFields()
    }

    render() {
        let onProductTableUpdate = this.props.onProductTableUpdate;
        let rowDel = this.props.onRowDel;
        let filterText = this.props.filterText;
        let technology = this.props.technologies.map(function(technology) {
            if (technology.name.indexOf(filterText) === -1) {
                return;
            }
            return (<ProductRow onProductTableUpdate={onProductTableUpdate} technology={technology} onDelEvent={rowDel.bind(this)} key={technology.id}/>)
        });
        return (
            <div>

                <FormGroup>
                    <Form.Label for="technology">Tehnologie de Interes</Form.Label>
                    <Form.Control id="technology"  type="text" value={this.state.technology} onChange={(e) => {
                        let {technology} = this.state;

                        technology = e.target.value;

                        this.setState({technology});
                    }}/>
                    <button type="button" onClick={this.onRowAdd.bind(this)} className="btn btn-success pull-right">Add</button>
                    <button type="button" onClick={this.addFields.bind(this)} className="btn-elegant">Submit All</button>
                </FormGroup>
                <table className="table table-bordered">
                    <thead>
                    <tr >
                        <th>Tehnologii de Interes</th>
                    </tr>
                    </thead>

                    <tbody>
                    {technology}

                    </tbody>

                </table>
                <br>

                </br>
                <br>

                </br>
                <br>

                </br>
            </div>
        );

    }

}

class ProductRow extends React.Component {
    onDelEvent() {
        this.props.onDelEvent(this.props.technology);

    }
    render() {

        return (
            <tr className="eachRow">
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    "type": "name",
                    value: this.props.technology.name,
                    id: this.props.technology.name
                }}/>
                <td className="del-cell">
                    <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
                </td>
            </tr>
        );

    }

}
class EditableCell extends React.Component {

    render() {
        return (
            <td>
                <input type='text' value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
            </td>
        );

    }

}

export default TechnologiesOfInterestTable;