export default class Form {

  form: Object;

  protected buildForm(schema: any, formBody: any) {
    // @ts-ignore
    this.form = schema.safeParse(formBody);
  }

  private hasForm() {
    return !!this.form;
  }

  public getData(): any {
    if (!this.hasForm()) return {}
    // @ts-ignore
    return this.form.data;
  }

  public hasSuccess(): boolean {
    if (!this.hasForm()) return false;
    // @ts-ignore
    return this.form.success;
  }

  public hasError(): boolean {
    return !this.hasSuccess();
  };
}