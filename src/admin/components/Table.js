import React from 'react';

function Table({ columns, data, onRowClick, renderActions }) {
  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={col.headerClass} style={col.headerStyle}>
                {col.header}
              </th>
            ))}
            {renderActions && <th>관리</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx} style={col.cellStyle}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {renderActions && (
                <td onClick={(e) => e.stopPropagation()}>
                  {renderActions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
