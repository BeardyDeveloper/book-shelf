import type { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled, { css } from 'styled-components';

import { Checkbox } from '../CheckBox/CheckBox';

interface SelectBoxProps {
  list: any[];
  selectedIds: string[];
  onSelect: (id: string) => void;
}

export const SelectBox: FC<SelectBoxProps> = props => {
  const { list, selectedIds, onSelect } = props;

  return (
    <Container>
      <PerfectScrollbar>
        <List>
          {list?.map(item => (
            <ListItem key={item.id}>
              <Checkbox
                label={item.title}
                isSelected={selectedIds.includes(item.id)}
                onSelect={() => onSelect(item.id)}
              />
            </ListItem>
          ))}
        </List>
      </PerfectScrollbar>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  ${({ theme }) => css`
    background-color: ${theme.palette.Neutral[800]};
  `}
`;

const List = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 12px;
`;

const ListItem = styled.div`
  margin-bottom: 14px;
  &:last-child {
    margin-bottom: 0;
  }
`;
