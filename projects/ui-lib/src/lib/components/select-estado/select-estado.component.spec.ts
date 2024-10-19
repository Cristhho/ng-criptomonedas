import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Validators } from "@angular/forms";
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatSelectHarness } from "@angular/material/select/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { SelectEstadoComponent } from "./select-estado.component";
import { configureControlValueAccesorTests } from "../../../test";
import { MatOptionHarness } from "@angular/material/core/testing";

const opciones = [
  { label: "", value: "" },
  { label: "Activo", value: "A" },
  { label: "Inactivo", value: "I" },
];

describe("SelectEstadoComponent", () => {
  let onChangeSpy: jasmine.Spy;
  let onTouchedSpy: jasmine.Spy;

  let component: SelectEstadoComponent;
  let fixture: ComponentFixture<SelectEstadoComponent>;
  const inputId = "test";
  let loader: HarnessLoader;

  configureControlValueAccesorTests({ component: SelectEstadoComponent });

  beforeEach(() => {
    onChangeSpy = jasmine.createSpy("onChangeSpy");
    onTouchedSpy = jasmine.createSpy("onTouchedSpy");
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
    fixture = TestBed.createComponent(SelectEstadoComponent);
    component = fixture.componentInstance;
    component.inputId = inputId;
    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it("should load all select harnesses", async () => {
    const selects = await loader.getAllHarnesses(MatSelectHarness);
    expect(selects.length).toBe(1);
  });

  it("should not has a value", () => {
    expect(onChangeSpy).toHaveBeenCalledTimes(0);
    expect(onTouchedSpy).toHaveBeenCalledTimes(0);
    expect(component.value).toBeFalsy();
  });

  it("Debe abrir y cerrar el Select", async () => {
    const select = await loader.getHarness(MatSelectHarness);

    expect(await select.isOpen()).toBe(false);

    await select.open();
    expect(await select.isOpen()).toBe(true);

    await select.close();
    expect(await select.isOpen()).toBe(false);
  });

  describe("when click the dropdown container", () => {
    let select: MatSelectHarness;
    let options: MatOptionHarness[];
    beforeEach(async () => {
      component.formControl.setValidators(Validators.required);
      component.formControl.updateValueAndValidity();
      select = await loader.getHarness(MatSelectHarness);
      await select.open();
      options = await select.getOptions();
    });

    it("should show the options", async () => {
      expect(options.length).toBeGreaterThan(0);
      expect(options.length).toBe(opciones.length);
      expect(await options[1].getText()).toBe(opciones[1].label);
    });

    it("should set the value when an option is selected", async () => {
      await select.blur();
      await options[1].click();
      component.formControl.setValue(opciones[1].value);
      component.formControl.updateValueAndValidity();

      expect(onTouchedSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(await select.getValueText()).toBe(opciones[1].label);
      expect(component.formControl.value).toBe(opciones[1].value);
    });
  });
});
