import React from 'react';
import './debts.css';

function Debts() {
  return (
    <>
    <header>
       Olá João, segue abaixo suas contas referentes ao mês de ....
    </header>
    <table>
        <thead>
            <tr>
                <th>Descrição</th>
                <th>Fornecedor</th>
                <th>Valor</th>
                <th>Data Pagamento</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Desc..</td>
                <td>Desc..</td>
                <td>Desc..</td>
                <td>Desc..</td>
            </tr>
            <tr>
                <td>Desc..</td>
                <td>Desc..</td>
                <td>Desc..</td>
                <td>Desc..</td>
            </tr>
            <tr>
                <td>Desc..</td>
                <td>Desc..</td>
                <td>Desc..</td>
                <td>Desc..</td>
            </tr>
        </tbody>
    </table>

    </>
  );
}

export default Debts;
