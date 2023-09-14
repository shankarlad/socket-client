import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-canvas-to-draw',
  templateUrl: './canvas-to-draw.component.html',
  styleUrls: ['./canvas-to-draw.component.css']
})
export class CanvasToDrawComponent {

  /**
   * @type {ElementRef}
   * @memberof CanvasToDrawComponent
   * @description Reference to the canvas element
   */
  @ViewChild('canvasToDraw',{static:true}) canvasToDraw!: ElementRef;

  private ctx!: CanvasRenderingContext2D;
  
  constructor(private _socketService: SocketService) { }

  ngOnInit() { 
    this.ctx = this.canvasToDraw.nativeElement.getContext('2d'); // get the context of the canvas element

    // listen to the event from the server and draw.
    this._socketService.listen('draw-to-canvas').subscribe((data: any) => {
      this.ctx.lineWidth = 10;
      this.ctx.strokeStyle = 'red';
      this.ctx.lineCap = 'round';
      this.ctx.beginPath();
      this.ctx.moveTo(data.x, data.y);
      this.ctx.lineTo(data.x, data.y);
      this.ctx.stroke();
    });
  
  }
  

}
