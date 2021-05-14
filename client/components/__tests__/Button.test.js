import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { toHaveStyle } from '@testing-library/jest-native';

import Button, {
  BUTTON_ACTIVITY_INDICATOR_ID,
  BUTTON_TEXT_ID,
  BUTTON_CONTAINER_ID,
} from '../Button';

import { color, font, layout } from '../../constants';

expect.extend({ toHaveStyle });

describe('Button', () => {
  const buttonTitle = 'My Button';

  describe('test large buttons', () => {
    describe('test large text buttons', () => {
      it('renders an enabled large text button', () => {
        const onPress = jest.fn();
        const { getByTestId, queryByTestId, toJSON } = render(
          <Button title={buttonTitle} onPress={onPress} />,
        );

        expect(queryByTestId(BUTTON_TEXT_ID)).not.toBeNull();
        expect(queryByTestId(BUTTON_ACTIVITY_INDICATOR_ID)).toBeNull();

        const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
        expect(buttonContainer).toHaveStyle({
          height: layout.buttonSizes.large,
          borderRadius: layout.radius.lg,
        });

        // Jest doesn't recognise that `RenderAPI.container` is disabled, so
        // instead we check the number of times our mock function has been
        // called. We do this for all test cases for Button.
        fireEvent.press(buttonContainer);
        expect(onPress).toHaveBeenCalledTimes(1);

        const buttonText = getByTestId(BUTTON_TEXT_ID);
        expect(buttonText.props.children).toBe(buttonTitle);

        expect(toJSON()).toMatchSnapshot();
      });

      it('renders a disabled large text button', () => {
        const onPress = jest.fn();
        const { getByTestId, queryByTestId, toJSON } = render(
          <Button disabled title={buttonTitle} onPress={onPress} />,
        );

        expect(queryByTestId(BUTTON_TEXT_ID)).not.toBeNull();
        expect(queryByTestId(BUTTON_ACTIVITY_INDICATOR_ID)).toBeNull();

        const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
        expect(buttonContainer).toHaveStyle({
          height: layout.buttonSizes.large,
          borderRadius: layout.radius.lg,
        });

        fireEvent.press(buttonContainer);
        expect(onPress).toHaveBeenCalledTimes(0);

        const buttonText = getByTestId(BUTTON_TEXT_ID);
        expect(buttonText.props.children).toBe(buttonTitle);

        expect(toJSON()).toMatchSnapshot();
      });
    });

    describe('test large loading buttons', () => {
      it('renders an enabled large loading button', () => {
        const onPress = jest.fn();
        const { getByTestId, queryByTestId, toJSON } = render(
          <Button isLoading title={buttonTitle} onPress={onPress} />,
        );

        expect(queryByTestId(BUTTON_TEXT_ID)).toBeNull();
        expect(queryByTestId(BUTTON_ACTIVITY_INDICATOR_ID)).not.toBeNull();

        const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
        expect(buttonContainer).toHaveStyle({
          height: layout.buttonSizes.large,
          borderRadius: layout.radius.lg,
        });

        fireEvent.press(buttonContainer);
        expect(onPress).toHaveBeenCalledTimes(0);

        expect(toJSON()).toMatchSnapshot();
      });

      it('renders a disabled large loading button', () => {
        const onPress = jest.fn();
        const { getByTestId, queryByTestId, toJSON } = render(
          <Button disabled isLoading title={buttonTitle} onPress={onPress} />,
        );

        expect(queryByTestId(BUTTON_TEXT_ID)).toBeNull();
        expect(queryByTestId(BUTTON_ACTIVITY_INDICATOR_ID)).not.toBeNull();

        const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
        expect(buttonContainer).toHaveStyle({
          height: layout.buttonSizes.large,
          borderRadius: layout.radius.lg,
        });

        fireEvent.press(buttonContainer);
        expect(onPress).toHaveBeenCalledTimes(0);

        expect(toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('test small buttons', () => {
    describe('test small text buttons', () => {
      it('renders an enabled small text button', () => {
        const onPress = jest.fn();
        const { getByTestId, queryByTestId, toJSON } = render(
          <Button size="small" title={buttonTitle} onPress={onPress} />,
        );

        expect(queryByTestId(BUTTON_TEXT_ID)).not.toBeNull();
        expect(queryByTestId(BUTTON_ACTIVITY_INDICATOR_ID)).toBeNull();

        const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
        expect(buttonContainer).toHaveStyle({
          height: layout.buttonSizes.small,
          borderRadius: layout.radius.md,
        });

        // Jest doesn't recognise that `RenderAPI.container` is disabled, so
        // instead we check the number of times our mock function has been
        // called. We do this for all test cases for Button.
        fireEvent.press(buttonContainer);
        expect(onPress).toHaveBeenCalledTimes(1);

        const buttonText = getByTestId(BUTTON_TEXT_ID);
        expect(buttonText.props.children).toBe(buttonTitle);

        expect(toJSON()).toMatchSnapshot();
      });

      it('renders a disabled small text button', () => {
        const onPress = jest.fn();
        const { getByTestId, queryByTestId, toJSON } = render(
          <Button
            size="small"
            disabled
            title={buttonTitle}
            onPress={onPress}
          />,
        );

        expect(queryByTestId(BUTTON_TEXT_ID)).not.toBeNull();
        expect(queryByTestId(BUTTON_ACTIVITY_INDICATOR_ID)).toBeNull();

        const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
        expect(buttonContainer).toHaveStyle({
          height: layout.buttonSizes.small,
          borderRadius: layout.radius.md,
        });

        fireEvent.press(buttonContainer);
        expect(onPress).toHaveBeenCalledTimes(0);

        const buttonText = getByTestId(BUTTON_TEXT_ID);
        expect(buttonText.props.children).toBe(buttonTitle);

        expect(toJSON()).toMatchSnapshot();
      });
    });

    describe('test small loading buttons', () => {
      it('renders an enabled small loading button', () => {
        const onPress = jest.fn();
        const { getByTestId, queryByTestId, toJSON } = render(
          <Button
            isLoading
            size="small"
            title={buttonTitle}
            onPress={onPress}
          />,
        );

        expect(queryByTestId(BUTTON_TEXT_ID)).toBeNull();
        expect(queryByTestId(BUTTON_ACTIVITY_INDICATOR_ID)).not.toBeNull();

        const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
        expect(buttonContainer).toHaveStyle({
          height: layout.buttonSizes.small,
          borderRadius: layout.radius.md,
        });

        fireEvent.press(buttonContainer);
        expect(onPress).toHaveBeenCalledTimes(0);

        expect(toJSON()).toMatchSnapshot();
      });

      it('renders a disabled small loading button', () => {
        const onPress = jest.fn();
        const { getByTestId, queryByTestId, toJSON } = render(
          <Button
            disabled
            isLoading
            size="small"
            title={buttonTitle}
            onPress={onPress}
          />,
        );

        expect(queryByTestId(BUTTON_TEXT_ID)).toBeNull();
        expect(queryByTestId(BUTTON_ACTIVITY_INDICATOR_ID)).not.toBeNull();

        const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
        expect(buttonContainer).toHaveStyle({
          height: layout.buttonSizes.small,
          borderRadius: layout.radius.md,
        });

        fireEvent.press(buttonContainer);
        expect(onPress).toHaveBeenCalledTimes(0);

        expect(toJSON()).toMatchSnapshot();
      });
    });
  });
});

describe('Button styles', () => {
  const buttonTitle = 'My Button';

  describe('test primary button styles', () => {
    it('renders a primary default button ', () => {
      const { getByTestId } = render(
        <Button type="primary" title={buttonTitle} />,
      );

      const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
      expect(buttonContainer).toHaveStyle({
        backgroundColor: color.accent,
        borderColor: color.defaultBorderColor,
      });

      const buttonText = getByTestId(BUTTON_TEXT_ID);
      expect(buttonText).toHaveStyle({
        ...font.extraLargeBold,
        color: color.defaultDarkTextColor,
      });
    });

    it('renders a primary disabled button ', () => {
      const { getByTestId } = render(
        <Button type="primary" disabled title={buttonTitle} />,
      );

      const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
      expect(buttonContainer).toHaveStyle({
        backgroundColor: color.accentDisabled,
        borderColor: color.disabledBorderColor,
      });

      const buttonText = getByTestId(BUTTON_TEXT_ID);
      expect(buttonText).toHaveStyle({
        ...font.extraLargeBold,
        color: color.disabledDarkTextColor,
      });
    });
  });

  describe('test secondary button styles', () => {
    it('renders a secondary default button ', () => {
      const { getByTestId } = render(<Button title={buttonTitle} />);

      const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
      expect(buttonContainer).toHaveStyle({
        backgroundColor: color.white,
        borderColor: color.defaultBorderColor,
      });

      const buttonText = getByTestId(BUTTON_TEXT_ID);
      expect(buttonText).toHaveStyle({
        ...font.extraLargeBold,
        color: color.defaultDarkTextColor,
      });
    });

    it('renders a secondary disabled button ', () => {
      const { getByTestId } = render(<Button disabled title={buttonTitle} />);

      const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
      expect(buttonContainer).toHaveStyle({
        backgroundColor: color.white,
        borderColor: color.disabledBorderColor,
      });

      const buttonText = getByTestId(BUTTON_TEXT_ID);
      expect(buttonText).toHaveStyle({
        ...font.extraLargeBold,
        color: color.disabledDarkTextColor,
      });
    });
  });

  describe('test danger button styles', () => {
    it('renders a danger default button ', () => {
      const { getByTestId } = render(
        <Button type="danger" title={buttonTitle} />,
      );

      const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
      expect(buttonContainer).toHaveStyle({
        backgroundColor: color.danger,
        borderColor: color.defaultBorderColor,
      });

      const buttonText = getByTestId(BUTTON_TEXT_ID);
      expect(buttonText).toHaveStyle({
        ...font.extraLargeBold,
        color: color.defaultLightTextColor,
      });
    });

    it('renders a danger disabled button ', () => {
      const { getByTestId } = render(
        <Button disabled type="danger" title={buttonTitle} />,
      );

      const buttonContainer = getByTestId(BUTTON_CONTAINER_ID);
      expect(buttonContainer).toHaveStyle({
        backgroundColor: color.dangerDisabled,
        borderColor: color.disabledBorderColor,
      });

      const buttonText = getByTestId(BUTTON_TEXT_ID);
      expect(buttonText).toHaveStyle({
        ...font.extraLargeBold,
        color: color.disabledLightTextColor,
      });
    });
  });
});
