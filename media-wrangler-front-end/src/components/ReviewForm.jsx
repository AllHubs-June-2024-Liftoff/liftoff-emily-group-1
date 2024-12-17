import 'bulma/css/bulma.min.css';


function ReviewForm() {

  
    return (
        <>
        <form>
        <div class="review-container">
          <div class="content is-normal">
             <h1>Movie Title Goes Here (YEAR)</h1>
          </div>
       
          <br />

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Watched </label>
            </div>  
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input class="input is-info" type="date" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </p>
              </div>

        {/* Think about finding something that could go here...*/}
              <div class="field">
                <p class="control is-expanded has-icons-left has-icons-right">
                  <input class="input is-success" type="date" placeholder="Date watched" value="alex@smith.com" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
     
                </p>
              </div>
            </div>
          </div>

          {/* <div class="field is-horizontal">
            <div class="field-label"></div>
            <div class="field-body">
              <div class="field is-expanded">
                <div class="field has-addons">
                  <p class="control"></p>
                  <p class="control is-expanded">
                    <input class="input" type="text" placeholder="Title goes here..." />
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <br />

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Plot/StoryLine</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <div class="select is-warning">
                    <select>
                      <option>Poor</option>
                      <option>Fair</option>
                      <option>Good</option>
                      <option>Very Good</option>
                      <option>Excellent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
            <label class="checkbox">
              <input type="checkbox" />
              &nbsp; Does Review Contain Spoilers?
            </label>
            </div>
          </div>

          {/* <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Already a member?</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <label class="radio">
                    <input type="radio" name="member" />
                    Yes
                  </label>
                  <label class="radio">
                    <input type="radio" name="member" />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div> */}


        {/* If I use this box for tags or something, maybe it should go after the review?? */}

          {/* <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Subject</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input class="input is-danger" type="text" placeholder="e.g. Partnership opportunity" />
                </div>
                <p class="help is-danger">
                  This field is required
                </p>
              </div>
            </div>
          </div> */}

          <br />

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Review</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <textarea class="textarea" placeholder="Write your thoughts here ..." rows="10"></textarea>
                </div>
              </div>
            </div>
          </div>

          <br />

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Add Tags</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input class="input is-danger" type="text" placeholder="tag name here ..." />
                </div>
              </div>
            </div>
          </div>

          <br />

<div class="field is-horizontal">
  <div class="field-label">
    {/* <!-- Left empty for spacing --> */}
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <button class="button is-primary">
          Send message
        </button>
      </div>
    </div>
  </div>
</div>
</div>
</form>
        
        </>
    );
}

export default ReviewForm;
