import { View, ViewInput } from "../libs/types/view";
import Errors, { HttpCode, Message } from "../libs/Error";
import ViewModel from "../schema/View.model";

class ViewService {
  private readonly viewModel;
  constructor() {
    this.viewModel = ViewModel;
  }

  public async checkViewExistance(input: ViewInput): Promise<View> {
    const view = await this.viewModel
      .findOne({ memberId: input.memberId, viewRefId: input.viewRefId })
      .exec();
    return view?.toObject() as View;
  }

  public async insertMemberView(input: ViewInput): Promise<View> {
    try {
      const view = await this.viewModel.create(input)
      return view.toObject() as View;
    } catch (err) {
      console.log("error: insertMemberView", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default ViewService;
