import React from "react";

export default function TuesdayTunes() {
  return (
    <div>
      <form name="contact" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
        <div class="field">
          <label class="label">
            Your Name:
            <input class="input" type="text" name="name" />
          </label>
        </div>
        <div class="field">
          <label class="label">
            Your Email:
            <input class="input" type="email" name="email" />
          </label>
        </div>
        <div class="field">
          <label for="role[]" class="label">
            Your Role:
          </label>
          <div class="select is-multiple">
            <select name="role[]" multiple size="2">
              <option value="leader">Leader</option>
              <option value="follower">Follower</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">
            Message:
            <textarea class="textarea" name="message"></textarea>
          </label>
        </div>
        <div class="field">
          <button class="button is-primary is-medium" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
