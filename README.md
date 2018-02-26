# A customization of react-datepicker

This customization of [react-datepicker](https://github.com/Hacker0x01/react-datepicker/tree/master/src). It's a proof of concept for having a 2 month/ 2 input box display. It's a POC; so there are edge cases not handled and styling looks horrible.

## Notes on DatePicker options

*How do I disable all future dates?*

Basically you tell DatePicker what dates you want enabled with the `minDate` and `maxDate` props.
If you don't specify `minDate` then it will enable all dates until `maxDate`, like so:

```javascript
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                maxDate={moment()}
                showDisabledMonthNavigation
            />
```

*How to start with the calendar open?*

Use `startOpen` prop:
```javascript
<DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                startOpen
            />
```

*How to keep calendar open after selection?*
Set `shouldCloseOnSelect` prop to false:

```javascript
<DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                shouldCloseOnSelect={false}
            />
```

*How to show multiple month calender?*

Set `monthsShown` prop to the number you want:

```javascript
<DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                monthsShown={2}
            />
```

This usually looks better if you hide the days from 
the next month's calendar, which you would have to do
with css like this:

```css
.react-datepicker__day--outside-month {
  visibility: hidden;
}
```

*How to highlight date range?*

The simplest way is to pass `highlightDates` prop as array
of days. But if you want to customize the highlights you 
can either pass it an array of objects with custom class, like so:

```javascript
[
    { "react-datepicker__day--highlighted-custom-1": [
      moment().subtract(4, "days"),
      moment().subtract(3, "days"),
      moment().subtract(2, "days"),
      moment().subtract(1, "days") ]
    },
    { "react-datepicker__day--highlighted-custom-2": [
      moment().add(1, "days"),
      moment().add(2, "days"),
      moment().add(3, "days"),
      moment().add(4, "days") ]
    }
  ]
}
``` 

or just override react-datepicker default styling of highlighting.

*How to show just the calendar without input*
Use `inline` prop.
