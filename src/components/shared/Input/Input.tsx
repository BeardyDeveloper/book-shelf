/* eslint-disable complexity */
import type { FC } from 'react';
import styled, { css } from 'styled-components';

export interface InputProps {
  name?: string;
  label?: string;
  inputId?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  validationText?: string;
  className?: string;
  onChange?: (value: any) => void;
}

export const Input: FC<InputProps> = props => {
  const {
    name,
    label,
    inputId,
    placeholder,
    value,
    disabled,
    validationText,
    className,
    onChange,
  } = props;

  return (
    <Container className={className}>
      {label ? (
        <Label htmlFor={inputId} disabled={disabled}>
          {label}
        </Label>
      ) : null}
      <Field
        disabled={disabled}
        name={name}
        type="text"
        placeholder={placeholder}
        error={validationText !== '' && validationText != null}
        value={value}
        onChange={!disabled ? onChange : undefined}
      />
      {validationText && !disabled ? (
        <ValidationText error={validationText != null}>
          {validationText}
        </ValidationText>
      ) : null}
    </Container>
  );
};

interface StyledProps {
  error?: boolean;
  disabled?: boolean;
}

const Container = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label<StyledProps>`
  ${({ theme, disabled }) => css`
    color: ${disabled ? theme.cmp.input.disabled.label : theme.cmp.input.label};
    line-height: ${theme.typography.lineHeight.XS};
    font-size: ${theme.typography.fontSize.body.S};
    font-weight: ${theme.typography.fontWeight.semiBold};
    margin-bottom: 5px;
  `}
`;

const Field = styled.input<StyledProps>`
  all: unset;
  direction: ltr;
  text-align: left;
  width: 100%;
  height: 46px;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;

  ${({ theme, error, disabled }) => {
    let borderColor: string;
    let outlineColor: string;

    if (error) {
      borderColor = theme.cmp.input.border.error;
      outlineColor = 'none';
    } else {
      borderColor = theme.cmp.input.border.default;
      outlineColor = 'none';
    }

    return css`
      color: ${theme.cmp.input.color};
      caret-color: ${error ? theme.cmp.input.error : theme.cmp.input.color};
      font-weight: ${theme.typography.fontWeight.medium};
      font-size: ${theme.typography.fontSize.body.S};
      cursor: ${disabled ? 'no-drop' : 'normal'};
      background-color: ${theme.cmp.input.bg};
      padding: 0 10px;
      border: ${`1px solid ${borderColor}`};
      outline: ${`2px solid ${outlineColor}`};

      &:hover {
        border-color: ${!error && !disabled && theme.cmp.input.border.hover};
      }
      &:focus {
        border-color: ${!error && !disabled && theme.cmp.input.border.active};
        outline: ${`2px solid ${theme.cmp.input.outline}`};
      }

      &::placeholder {
        color: ${theme.cmp.input.placeholder};
        font-size: ${theme.typography.fontSize.body.M};
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:active,
      &:-webkit-autofill:focus {
        width: 100%;
        height: 46px;
        -webkit-appearance: none !important;
        -webkit-text-fill-color: ${theme.cmp.input.color} !important;
        border: unset !important;
        -webkit-box-shadow: unset !important;
        box-shadow: unset !important;
        background-color: transparent !important;
        -webkit-border-before: unset !important;
        transition: background-color 90000s ease-in-out 90000s;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &[type='number'] {
        -moz-appearance: textfield;
      }
    `;
  }}
`;

const ValidationText = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme, error }) => css`
    margin-top: 2px;
    color: ${error ? theme.cmp.input.error : theme.cmp.input.error};
    font-size: ${theme.typography.fontSize.body.XS};
    line-height: ${theme.typography.lineHeight.XXS};
  `}
`;
